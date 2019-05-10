<?php
/**
 * Set up some shared functionality for grid blocks.
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-gutenberg-products-block.
 *
 * @package WooCommerce\Blocks
 * @version 2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Abstract class for product grid functionality
 */
abstract class WGPB_Block_Grid_Base {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = '';

	/**
	 * Attributes.
	 *
	 * @var array
	 */
	protected $attributes = array();

	/**
	 * InnerBlocks content.
	 *
	 * @var string
	 */
	protected $content = '';

	/**
	 * Query args.
	 *
	 * @var array
	 */
	protected $query_args = array();

	/**
	 * Initialize block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 */
	public function __construct( $attributes = array(), $content = '' ) {
		$this->attributes = $this->parse_attributes( $attributes );
		$this->content    = $content;
		$this->query_args = $this->parse_query_args();
	}

	/**
	 * Get the block's attributes.
	 *
	 * @param array $attributes Block attributes. Default empty array.
	 * @return array  Block attributes merged with defaults.
	 */
	protected function parse_attributes( $attributes ) {
		// These should match what's set in JS `registerBlockType`.
		$defaults = array(
			'columns'           => wc_get_theme_support( 'product_blocks::default_columns', 3 ),
			'rows'              => wc_get_theme_support( 'product_blocks::default_rows', 1 ),
			'categories'        => array(),
			'catOperator'       => 'any',
			'contentVisibility' => array(
				'title'  => true,
				'price'  => true,
				'rating' => true,
				'button' => true,
			),
		);

		return wp_parse_args( $attributes, $defaults );
	}

	/**
	 * Parse query args.
	 *
	 * @return array
	 */
	protected function parse_query_args() {
		$query_args = array(
			'post_type'           => 'product',
			'post_status'         => 'publish',
			'ignore_sticky_posts' => true,
			'no_found_rows'       => false,
			'orderby'             => '',
			'order'               => '',
		);

		if ( isset( $this->attributes['orderby'] ) ) {
			if ( 'price_desc' === $this->attributes['orderby'] ) {
				$query_args['orderby'] = 'price';
				$query_args['order']   = 'DESC';
			} elseif ( 'price_asc' === $this->attributes['orderby'] ) {
				$query_args['orderby'] = 'price';
				$query_args['order']   = 'ASC';
			} elseif ( 'date' === $this->attributes['orderby'] ) {
				$query_args['orderby'] = 'date';
				$query_args['order']   = 'DESC';
			} else {
				$query_args['orderby'] = $this->attributes['orderby'];
			}
		}

		if ( ! empty( $this->attributes['rows'] ) ) {
			$this->attributes['limit'] = $this->attributes['columns'] * $this->attributes['rows'];
		}

		$query_args['posts_per_page'] = intval( $this->attributes['limit'] );
		$query_args['meta_query']     = WC()->query->get_meta_query(); // phpcs:ignore WordPress.DB.SlowDBQuery
		$query_args['tax_query']      = array(); // phpcs:ignore WordPress.DB.SlowDBQuery

		$this->set_block_query_args( $query_args );

		$ordering_args         = WC()->query->get_catalog_ordering_args( $query_args['orderby'], $query_args['order'] );
		$query_args['orderby'] = $ordering_args['orderby'];
		$query_args['order']   = $ordering_args['order'];
		if ( $ordering_args['meta_key'] ) {
			$query_args['meta_key'] = $ordering_args['meta_key']; // phpcs:ignore WordPress.DB.SlowDBQuery
		}

		// Categories.
		$this->set_categories_query_args( $query_args );

		// Always query only IDs.
		$query_args['fields'] = 'ids';

		return $query_args;
	}

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	abstract protected function set_block_query_args( &$query_args );

	/**
	 * Set categories query args.
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_categories_query_args( &$query_args ) {
		if ( ! empty( $this->attributes['categories'] ) ) {
			$categories = array_map( 'absint', $this->attributes['categories'] );

			$query_args['tax_query'][] = array(
				'taxonomy'         => 'product_cat',
				'terms'            => $categories,
				'field'            => 'term_id',
				'operator'         => 'all' === $this->attributes['catOperator'] ? 'AND' : 'IN',

				/*
				 * When cat_operator is AND, the children categories should be excluded,
				 * as only products belonging to all the children categories would be selected.
				 */
				'include_children' => 'all' === $this->attributes['catOperator'] ? false : true,
			);
		}
	}

	/**
	 * Run the query and return an array of product IDs
	 *
	 * @return array List of product IDs
	 */
	protected function get_products() {
		// @todo Cache this
		if ( 'product-top-rated' === $this->block_name ) {
			add_filter( 'posts_clauses', array( __CLASS__, 'order_by_rating_post_clauses' ) );
			$query = new WP_Query( $this->query_args );
			remove_filter( 'posts_clauses', array( __CLASS__, 'order_by_rating_post_clauses' ) );
		} else {
			$query = new WP_Query( $this->query_args );
		}

		$results = wp_parse_id_list( $query->posts );

		// Remove ordering query arguments which may have been added by get_catalog_ordering_args.
		WC()->query->remove_ordering_args();

		return $results;
	}

	/**
	 * Render the Products block.
	 *
	 * @return string Rendered block type output.
	 */
	public function render() {
		$products = $this->get_products();
		$classes  = $this->get_classes();

		$output = implode( '', array_map( array( $this, 'render_product' ), $products ) );

		return sprintf( '<ul class="%s">%s</ul>', $classes, $output );
	}

	/**
	 * Get the list of classes to apply to this block.
	 *
	 * @return string space-separated list of classes.
	 */
	public function get_classes() {
		$classes = array(
			'wc-block-grid',
			"wp-block-{$this->block_name}",
			"wc-block-{$this->block_name}",
			"has-{$this->attributes['columns']}-columns",
			'products',
		);

		if ( $this->attributes['rows'] > 1 ) {
			$classes[] = 'has-multiple-rows';
		}

		if ( isset( $this->attributes['align'] ) ) {
			$classes[] = "align{$this->attributes['align']}";
		}

		return implode( ' ', $classes );
	}

	/**
	 * Render a single products.
	 *
	 * @param int $id Product ID.
	 * @return string Rendered product output.
	 */
	public function render_product( $id ) {
		global $product;
		$product = wc_get_product( $id );
		if ( ! $product ) {
			return '';
		}

		$title = sprintf(
			'<div class="wc-block-grid__product-title">%s</div>',
			wp_kses_post( $product->get_title() )
		);

		$rating_str = $this->get_rating( $product );

		$price_str = sprintf(
			'<div class="wc-block-grid__product-price price">%s</div>',
			$product->get_price_html()
		);

		ob_start();
		woocommerce_show_product_sale_flash();
		$on_sale_flag = ob_get_contents();
		ob_end_clean();

		$button_str = sprintf(
			'<div class="wc-block-grid__product-add-to-cart">%s</div>',
			$this->get_add_to_cart( $product )
		);

		$content = sprintf(
			'<a href="%s" class="wc-block-grid__product-link">',
			$product->get_permalink()
		);

		$content .= sprintf(
			'<div class="wc-block-grid__product-image">%s</div>',
			woocommerce_get_product_thumbnail()
		);

		if ( $this->attributes['contentVisibility']['title'] ) {
			$content .= $title;
		}
		if ( $this->attributes['contentVisibility']['rating'] ) {
			$content .= $rating_str;
		}
		if ( $this->attributes['contentVisibility']['price'] ) {
			$content .= $on_sale_flag . $price_str;
		}
		// Close the content link before we output the button.
		$content .= '</a>';
		if ( $this->attributes['contentVisibility']['button'] ) {
			$content .= $button_str;
		}

		return sprintf( '<li class="wc-block-grid__product product">%1$s</li>', $content );
	}

	/**
	 * Render the "add to cart" button
	 *
	 * @param WC_Product $product Product.
	 * @return string Rendered product output.
	 */
	public function get_add_to_cart( $product ) {
		if ( $product->supports( 'ajax_add_to_cart' ) ) {
			return sprintf(
				'<a href="%1$s" data-quantity="1" data-product_id="%2$s" data-product_sku="%3$s" class="button add_to_cart_button ajax_add_to_cart" rel="nofollow" aria-label="%4$s">%5$s</a>',
				esc_url( $product->add_to_cart_url() ),
				esc_attr( $product->get_id() ),
				esc_attr( $product->get_sku() ),
				esc_attr( $product->add_to_cart_description() ),
				esc_html( $product->add_to_cart_text() )
			);
		}

		return sprintf(
			'<a href="%1$s" class="button add_to_cart_button" rel="nofollow" aria-label="%2$s">%3$s</a>',
			esc_url( $product->add_to_cart_url() ),
			esc_attr( $product->add_to_cart_description() ),
			esc_html( $product->add_to_cart_text() )
		);
	}

	/**
	 * Render the rating icons.
	 *
	 * @param WC_Product $product Product.
	 * @return string Rendered product output.
	 */
	public function get_rating( $product ) {
		$rating_count = $product->get_rating_count();
		$review_count = $product->get_review_count();
		$average      = $product->get_average_rating();

		if ( $rating_count > 0 ) {
			return sprintf(
				'<div class="woocommerce-product-rating wc-block-grid__product-rating">%s</div>',
				wc_get_rating_html( $average, $rating_count )
			);
		}

		return '';
	}
}
