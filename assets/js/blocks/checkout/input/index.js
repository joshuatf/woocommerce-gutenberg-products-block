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
	parent: [ 'woocommerce/checkout-billing' ],
	supports: {
		html: false,
		inserter: false,
		multiple: false,
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
		required: {
			type: 'boolean',
			default: false,
		},
		isVisible: {
			type: 'boolean',
			default: true,
		},
	},
	edit( { attributes } ) {
		const { className, isVisible, label, required, type } = attributes;

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
					label={ label }
					type={ type }
					value=""
					onChange={ () => {} }
					required={ required }
				/>
			</Fragment>
		);
	},
	save() {
		return null;
	},
} );
