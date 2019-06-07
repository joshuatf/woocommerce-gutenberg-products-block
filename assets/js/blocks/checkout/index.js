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
import './coupon';
import './input';
import './privacy-policy';
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
					[ 'woocommerce/checkout-coupon' ],
					[ 'woocommerce/checkout-billing' ],
					[ 'woocommerce/checkout-cart' ],
					[ 'woocommerce/checkout-privacy-policy' ],
				] }
				templateLock="all"
			/>
		);
	},
	save() {
		return null;
	},
} );
