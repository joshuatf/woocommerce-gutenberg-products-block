/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

registerBlockType( 'woocommerce/checkout-select', {
	title: __( 'Checkout Select', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	parent: [ 'woocommerce/checkout-billing' ],
	supports: {
		html: false,
		inserter: false,
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
		isRequired: {
			type: 'boolean',
			default: false,
		},
		showRequiredAsterisk: {
			type: 'boolean',
			default: false,
		},
	},
	edit( { attributes } ) {
		const { className, label, options, showRequiredAsterisk, isRequired } = attributes;

		const formattedLabel = showRequiredAsterisk && isRequired ? (
			<Fragment>
				{ label }
				<abbr className="required" title="required">*</abbr>
			</Fragment>
		) : label;

		return (
			<SelectControl
				className={ className }
				disabled
				label={ formattedLabel }
				value=""
				options={ options }
				onChange={ () => {} }
				required={ isRequired }
			/>
		);
	},
	save() {
		return null;
	},
} );
