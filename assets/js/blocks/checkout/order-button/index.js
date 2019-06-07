/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';

registerBlockType( 'woocommerce/order-button', {
	title: __( 'Checkout Place Order Button', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		return (
			<Button className="wc-checkout__place-order-button">
				{ __( 'Place order', 'woo-gutenberg-products-block' ) }
			</Button>
		);
	},
	save() {
		return null;
	},
} );
