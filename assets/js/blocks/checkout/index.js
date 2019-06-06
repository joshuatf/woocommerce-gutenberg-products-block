/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './billing';
import './cart';
import './checkbox';
import './input';
import './radio';
import './select';
import './textarea';

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
					[ 'woocommerce/billing' ],
					[ 'woocommerce/checkout-cart' ],
				] }
				templateLock="all"
			/>
		);
	},
	save() {
		return null;
	},
} );
