/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextareaControl } from '@wordpress/components';

registerBlockType( 'woocommerce/checkout-textarea', {
	title: __( 'Checkout Textarea', 'woo-gutenberg-products-block' ),
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
	},
	edit( { attributes } ) {
		const { label } = attributes;

		return (
			<TextareaControl
				disabled
				label={ label }
				value=""
				onChange={ () => {} }
			/>
		);
	},
	save() {
		return null;
	},
} );
