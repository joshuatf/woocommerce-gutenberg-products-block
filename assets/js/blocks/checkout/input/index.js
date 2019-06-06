/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';

registerBlockType( 'woocommerce/checkout-input', {
	title: __( 'Checkout Input', 'woo-gutenberg-products-block' ),
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
		className: {
			type: 'string',
			default: '',
		},
		required: {
			type: 'boolean',
			default: false,
		},
	},
	edit( { attributes } ) {
		const { className, label, type, required } = attributes;

		return (
			<TextControl
				className={ className }
				disabled
				label={ label }
				type={ type }
				value=""
				onChange={ () => {} }
				required={ required }
			/>
		);
	},
	save() {
		return null;
	},
} );
