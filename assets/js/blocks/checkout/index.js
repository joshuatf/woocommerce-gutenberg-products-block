/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';

registerBlockType( 'woocommerce/checkout', {
	title: __( 'Checkout', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		return (
			<InnerBlocks
				template={ [
					[
						'core/heading',
						{
							content: __( 'Billing', 'woo-gutenberg-products-block' ),
							level: 3,
						},
					],
				] }
				templateLock="all"
			/>
		);
	},
	save() {
		return null;
	},
} );
