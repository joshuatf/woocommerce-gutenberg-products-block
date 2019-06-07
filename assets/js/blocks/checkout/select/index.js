/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { SelectControl } from '@wordpress/components';

registerBlockType( 'woocommerce/checkout-select', {
	title: __( 'Checkout select', 'woo-gutenberg-products-block' ),
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
		options: {
			type: 'array',
			default: [
				{ label: '', value: '' },
			],
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
		const { className, label, options, required } = attributes;

		return (
			<SelectControl
				className={ className }
				disabled
				label={ label }
				value=""
				options={ options }
				onChange={ () => {} }
				required={ required }
			/>
		);
	},
	save() {
		return null;
	},
} );
