<?php
/**
 * Display the Best Selling Products block in the post content.
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-gutenberg-products-block.
 *
 * @package WooCommerce\Blocks
 * @version 2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handler for getting best selling products for display.
 */
class WGPB_Block_Product_Best_Sellers extends WGPB_Block_Grid_Base {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-best-sellers';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		$query_args['meta_key'] = 'total_sales'; // phpcs:ignore WordPress.DB.SlowDBQuery
		$query_args['order']    = 'DESC';
		$query_args['orderby']  = 'meta_value_num';
	}
}
