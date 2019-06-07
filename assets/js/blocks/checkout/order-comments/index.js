/**
* WordPress dependencies
*/
import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'woocommerce/checkout-order-comments', {
	title: __( 'Checkout Order Comments', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		return (
			<TextareaControl
				className="wc-checkout__order-comments"
				disabled
				label={ __( 'Order notes', 'woocommerce-admin' ) }
				placeholder={ __( 'Notes about your order, e.g. special notes for delivery.', 'woocommerce-admin' ) }
				onChange={ () => {} }
				required={ false }
			/>
		);
	},
	save() {
		return null;
	},
} );
