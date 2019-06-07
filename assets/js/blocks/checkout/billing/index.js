/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';

const getFieldBlock = ( field, showRequiredAsterisk ) => {
	const { shopCountry } = wc_checkout_block_data;
	const className = Array.isArray( field.class ) ? field.class.join( ' ' ) : null;
	const { label, placeholder, required, visible } = field;
	const attributes = { className, label, placeholder, isRequired: required, isVisible: visible, showRequiredAsterisk };
	const withSettings = [
		'organization',
		'address-line2',
		'tel',
	];

	switch ( field.type ) {
		case 'textarea':
			return [ 'woocommerce/checkout-textarea', attributes ];

		case 'checkbox':
			return [ 'woocommerce/checkout-checkbox', attributes ];

		case 'radio':
			const options = Object.entries( field.options ).map(
				( [ value, optionLabel ] ) => ( { label: optionLabel, value } )
			);
			return [ 'woocommerce/checkout-radio', { ...attributes, options } ];

		case 'select':
		case 'multiselect':
		case 'state':
			return [ 'woocommerce/checkout-select', attributes ];

		case 'country':
			return [ 'woocommerce/checkout-select', { ...attributes, options: [ { label: shopCountry, value: shopCountry } ] } ];

		case 'password':
		case 'email':
		case 'tel':
		case 'text':
			return [ 'woocommerce/checkout-input', { ...attributes, type: field.type, hasSettings: withSettings.includes( field.autocomplete ) } ];

		default:
			return [ 'woocommerce/checkout-input', { ...attributes, type: 'text', hasSettings: withSettings.includes( field.autocomplete ) } ];
	}
};

const getFieldBlocks = ( showRequiredAsterisk ) => {
	if (
		'object' !== typeof wc_checkout_block_data ||
		'object' !== typeof wc_checkout_block_data.billingFields
	) {
		return;
	}

	return Object.values( wc_checkout_block_data.billingFields ).map( ( field ) =>
		getFieldBlock( field, showRequiredAsterisk )
	);
};

const blockConfiguration = {
	title: __( 'Billing', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	attributes: {
		showRequiredAsterisk: {
			type: 'boolean',
			default: false,
		},
	},
	edit( { attributes } ) {
		const { showRequiredAsterisk } = attributes;

		return (
			<InnerBlocks
				template={ [
					[
						'core/heading',
						{
							content: __( 'Billing details', 'woo-gutenberg-products-block' ),
							level: 3,
						},
					],
					...getFieldBlocks( showRequiredAsterisk ),
				] }
				templateLock="all"
			/>
		);
	},
	save() {
		return <InnerBlocks.Content />;
	},
};

registerBlockType( 'woocommerce/checkout-billing', blockConfiguration );

registerBlockType( 'woocommerce/checkout-billing-with-asterisks', blockConfiguration );
