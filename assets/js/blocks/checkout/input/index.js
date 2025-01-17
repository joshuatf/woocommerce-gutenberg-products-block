/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl, PanelBody, ToggleControl, Notice } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';

registerBlockType( 'woocommerce/checkout-input', {
	title: __( 'Checkout Input', 'woo-gutenberg-products-block' ),
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
		type: {
			type: 'string',
			default: '',
		},
		className: {
			type: 'string',
			default: '',
		},
		showRequiredAsterisk: {
			type: 'boolean',
			default: false,
		},
		placeholder: {
			type: 'string',
			default: '',
		},
		hasSettings: {
			type: 'boolean',
			default: false,
		},
		isVisible: {
			type: 'boolean',
			default: true,
		},
		isRequired: {
			type: 'boolean',
			default: false,
		},
	},
	edit( { attributes, setAttributes } ) {
		const { className, label, placeholder, type, hasSettings, isVisible, isRequired, showRequiredAsterisk } = attributes;

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
				{ hasSettings && (
					<InspectorControls key="inspector">
						<PanelBody
							title={ __( 'Field Settings', 'woo-gutenberg-products-block' ) }
						>
							<ToggleControl
								label={ __( 'Visibility', 'woo-gutenberg-products-block' ) }
								help={ isVisible ? __( 'This field is visible.', 'woo-gutenberg-products-block' ) : __( 'This field is hidden.', 'woo-gutenberg-products-block' ) }
								checked={ isVisible }
								onChange={ ( nextValue ) => setAttributes( { isVisible: nextValue } ) }
							/>
							{ isVisible && (
								<ToggleControl
									label={ __( 'Required', 'woo-gutenberg-products-block' ) }
									help={ isRequired ? __( 'This field is required.', 'woo-gutenberg-products-block' ) : __( 'This field is optional.', 'woo-gutenberg-products-block' ) }
									checked={ isRequired }
									onChange={ ( nextValue ) => setAttributes( { isRequired: nextValue } ) }
								/>
							) }
						</PanelBody>
					</InspectorControls>
				) }
				<TextControl
					className={ className }
					disabled
					label={ formattedLabel }
					type={ type }
					value=""
					onChange={ () => {} }
					required={ isRequired }
					placeholder={ placeholder }
				/>
			</Fragment>
		);
	},
	save() {
		return null;
	},
} );
