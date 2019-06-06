/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RadioControl } from '@wordpress/components';

registerBlockType( 'woocommerce/checkout-radio', {
	title: __( 'Checkout radio', 'woo-gutenberg-products-block' ),
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
	},
	edit( { attributes } ) {
		const { label, options } = attributes;

		return (
			<RadioControl
				disabled
				label={ label }
				selected={ null }
				options={ options }
				onChange={ () => {} }
			/>
		);
	},
	save() {
		return null;
	},
} );
