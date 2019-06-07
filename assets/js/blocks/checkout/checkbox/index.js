/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { CheckboxControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

registerBlockType( 'woocommerce/checkout-checkbox', {
	title: __( 'Checkout Checkbox', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	parent: [ 'woocommerce/checkout-billing' ],
	supports: {
		html: false,
		inserter: false,
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
		const { className, heading, label, isRequired, showRequiredAsterisk } = attributes;

		const formattedLabel = showRequiredAsterisk && isRequired ? (
			<Fragment>
				{ label }
				<abbr className="required" title="required">*</abbr>
			</Fragment>
		) : label;

		return (
			<CheckboxControl
				classNames={ className }
				disabled
				heading={ heading }
				label={ formattedLabel }
				checked={ false }
				onChange={ () => {} }
				required={ isRequired }
			/>
		);
	},
	save() {
		return null;
	},
} );
