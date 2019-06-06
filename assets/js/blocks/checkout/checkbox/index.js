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
		heading: {
			type: 'string',
			default: '',
		},
		label: {
			type: 'string',
			default: '',
		},
	},
	edit( { attributes } ) {
		const { heading, label } = attributes;

		return (
			<CheckboxControl
				disabled
				heading={ heading }
				label={ label }
				checked={ false }
				onChange={ () => {} }
			/>
		);
	},
	save() {
		return null;
	},
} );
