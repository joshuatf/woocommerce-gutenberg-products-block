/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import '../order-button';
import '../payment-options';
import '../privacy-policy';
import '../terms';

registerBlockType( 'woocommerce/checkout-place-order', {
	title: __( 'Place Order', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	parent: [ 'woocommerce/checkout' ],
	supports: {
		html: false,
		inserter: false,
		multiple: false,
	},
	edit() {
		return (
			<InnerBlocks
				template={ [
					[ 'woocommerce/checkout-privacy-policy' ],
					[ 'woocommerce/checkout-terms-and-conditions' ],
					[ 'woocommerce/checkout-order-button' ],
					[ 'woocommerce/checkout-payment-options' ],
				] }
				templateLock="all"
			/>
		);
	},
	save() {
		return <InnerBlocks.Content />;
	},
} );
