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
		id: {
			type: 'string',
			default: '',
		},
		label: {
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
		const { className, label, required } = attributes;

		return (
			<TextareaControl
				className={ className }
				disabled
				label={ label }
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
