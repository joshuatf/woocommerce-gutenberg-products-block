/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { Notice, TextControl } from '@wordpress/components';

registerBlockType( 'woocommerce/checkout-input', {
	title: __( 'Checkout Input', 'woo-gutenberg-products-block' ),
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
		type: {
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
		isVisible: {
			type: 'boolean',
			default: true,
		},
	},
	edit( { attributes } ) {
		const { className, label, type, isVisible, isRequired, showRequiredAsterisk } = attributes;

		const formattedLabel = showRequiredAsterisk && isRequired ? (
			<Fragment>
				{ label + ' ' }
				<abbr className="required" title="required">*</abbr>
			</Fragment>
		) : label;

		return (
			<Fragment>
				{ Boolean( ! isVisible ) && (
					<Notice status="info" isDismissible={ false }>
						{ __(
							'This block is hidden. Visibility can be adjusted in the block settings sidebar.',
							'woo-gutenberg-products-block'
						) }
					</Notice>
				) }
				<TextControl
					className={ className }
					disabled
					label={ formattedLabel }
					type={ type }
					value=""
					onChange={ () => {} }
					required={ isRequired }
				/>
			</Fragment>
		);
	},
	save() {
		return null;
	},
} );
