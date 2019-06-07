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
import './order-comments';
import './place-order';
import './radio';
import './select';
import './shipping';
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
					[ 'woocommerce/checkout-shipping' ],
					[ 'woocommerce/checkout-order-comments' ],
					[ 'woocommerce/checkout-cart' ],
					[ 'woocommerce/checkout-place-order' ],
				] }
				templateLock="all"
			/>
		);
	},
	save() {
		return <InnerBlocks.Content />;
	},
} );
