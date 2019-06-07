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
	parent: [ 'woocommerce/checkout-billing' ],
	supports: {
		html: false,
		inserter: false,
		multiple: false,
	},
	attributes: {
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
			<SelectControl
				className={ className }
				disabled
				label={ label }
				value=""
				options={ [ { label: '', value: '' } ] }
				onChange={ () => {} }
				required={ required }
			/>
		);
	},
	save() {
		return null;
	},
} );
