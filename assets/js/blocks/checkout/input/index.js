/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

registerBlockType( 'woocommerce/checkout-input', {
	title: __( 'Checkout input', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	attributes: {
		label: {
			type: 'string',
			default: '',
		},
		type: {
			type: 'string',
			default: '',
		},
	},
	edit( { attributes } ) {
		const { label, type } = attributes;

		return (
			<TextControl
				disabled
				label={ label }
				type={ type }
				value=""
				onChange={ () => {} }
			/>
		);
	},
	save() {
		return null;
	},
} );
