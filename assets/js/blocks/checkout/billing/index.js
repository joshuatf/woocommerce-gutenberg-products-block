/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';

const getFieldBlock = ( field ) => {
	const className = Array.isArray( field.class ) ? field.class.join( ' ' ) : null;
	const { label, required, visible } = field;
	const attributes = { className, label, isRequired:required, isVisible:visible };
	const withSettings = [
		'organization',
		'address-line2',
		'tel'
	];

	switch ( field.type ) {
		case 'textarea':
			return [ 'woocommerce/checkout-textarea', attributes ];

		case 'checkbox':
			return [ 'woocommerce/checkout-checkbox', attributes ];

		case 'radio':
			const options = Object.entries( field.options ).map( ( [ value, optionLabel ] ) => ( { label: optionLabel, value } ) );
			return [ 'woocommerce/checkout-radio', { ...attributes, options } ];

		case 'select':
		case 'multiselect':
		case 'country':
		case 'state':
			return [ 'woocommerce/checkout-select', attributes ];

		case 'password':
		case 'email':
		case 'tel':
		case 'text':
			return [ 'woocommerce/checkout-input', { ...attributes, ...{ type: field.type, hasSettings: withSettings.includes( field.autocomplete ) } } ];

		default:
			return [ 'woocommerce/checkout-input', { ...attributes, ...{ type: 'text', hasSettings: withSettings.includes( field.autocomplete ) } } ];
	}
};

const getFieldBlocks = () => {
	if ( 'object' !== typeof wc_checkout_block_data || 'object' !== typeof wc_checkout_block_data.billingFields ) {
		return;
	}

	return Object.values( wc_checkout_block_data.billingFields ).map( ( field ) => getFieldBlock( field ) );
};

registerBlockType( 'woocommerce/billing', {
	title: __( 'Billing', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
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
					...getFieldBlocks(),
				] }
				templateLock="all"
			/>
		);
	},
	save() {
		return <InnerBlocks.Content />;
	},
} );
