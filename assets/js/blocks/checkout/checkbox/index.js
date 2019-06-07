/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { CheckboxControl } from '@wordpress/components';

registerBlockType( 'woocommerce/checkout-checkbox', {
	title: __( 'Checkout checkbox', 'woo-gutenberg-products-block' ),
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
		heading: {
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
		const { className, heading, label, required } = attributes;

		return (
			<CheckboxControl
				classNames={ className }
				disabled
				heading={ heading }
				label={ label }
				checked={ false }
				onChange={ () => {} }
				required={ required }
			/>
		);
	},
	save() {
		return null;
	},
} );
