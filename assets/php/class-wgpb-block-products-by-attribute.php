<?php
/**
 * Display the Products by Attribute block in the post content.
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-gutenberg-products-block.
 *
 * @package WooCommerce\Blocks
 * @version 2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handler for getting products by attribute for display.
 */
class WGPB_Block_Products_By_Attribute extends WGPB_Block_Grid_Base {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'products-by-attribute';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		if ( ! empty( $this->attributes['attributes'] ) ) {
			$taxonomy = sanitize_title( $this->attributes['attributes'][0]['attr_slug'] );
			$terms    = wp_list_pluck( $this->attributes['attributes'], 'id' );

			$query_args['tax_query'][] = array(
				'taxonomy' => $taxonomy,
				'terms'    => array_map( 'absint', $terms ),
				'field'    => 'term_id',
				'operator' => 'all' === $this->attributes['attrOperator'] ? 'AND' : 'IN',
			);
		}
	}
}
