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
	attributes: {
		label: {
			type: 'string',
			default: '',
		},
	},
	edit( { attributes } ) {
		const { label } = attributes;

		return (
			<SelectControl
				disabled
				label={ label }
				value={ null }
				options={ [
					{ label: '', value: '' },
				] }
				onChange={ () => {} }
			/>
		);
	},
	save() {
		return null;
	},
} );
