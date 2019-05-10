<?php
/**
 * Display the newest product block in the post content.
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-gutenberg-products-block.
 *
 * @package WooCommerce\Blocks
 * @version 2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handler for getting newest products for display.
 */
class WGPB_Block_Product_New extends WGPB_Block_Grid_Base {
	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'product-new';

	/**
	 * Set args specific to this block
	 *
	 * @param array $query_args Query args.
	 */
	protected function set_block_query_args( &$query_args ) {
		$query_args['orderby'] = 'date';
		$query_args['order']   = 'DESC';
	}
}

/**
 * Render the Newest Products block.
 *
 * @param array  $attributes Block attributes. Default empty array.
 * @param string $content    Block content. Default empty string.
 * @return string Rendered block type output.
 */
function wgpb_block_render_product_new( $attributes, $content ) {
	$block = new WGPB_Block_Product_New( $attributes, $content );
	return $block->render();
}