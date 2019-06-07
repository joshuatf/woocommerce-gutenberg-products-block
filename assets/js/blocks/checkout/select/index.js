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
	supports: {
		html: false,
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
		const { className, label, showRequiredAsterisk, isRequired } = attributes;

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
				options={ [ { label: '', value: '' } ] }
				onChange={ () => {} }
				required={ isRequired }
			/>
		);
	},
	save() {
		return null;
	},
} );
