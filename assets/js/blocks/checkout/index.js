/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './billing';
import './cart';
import './checkbox';
import './coupon';
import './input';
import './place-order';
import './radio';
import './select';
import './textarea';

registerBlockType( 'woocommerce/checkout', {
	title: __( 'Checkout', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
		multiple: false,
	},
	attributes: {
		showRequiredAsterisk: {
			type: 'boolean',
			default: wc_checkout_block_data.highlightRequiredFields,
		},
	},
	edit( { attributes, setAttributes } ) {
		const { showRequiredAsterisk } = attributes;
		const billingName = showRequiredAsterisk ?
			'woocommerce/checkout-billing-with-asterisks' :
			'woocommerce/checkout-billing';

		return (
			<Fragment>
				<InnerBlocks
					template={ [
						[ 'woocommerce/checkout-coupon' ],
						[ billingName, { showRequiredAsterisk } ],
						[ 'woocommerce/checkout-cart' ],
						[ 'woocommerce/checkout-place-order' ],
					] }
					templateInsertUpdatesSelection={ false }
					templateLock="all"
				/>
				<InspectorControls key="inspector">
					<PanelBody title={ __( 'Content', 'woo-gutenberg-products-block' ) }>
						<ToggleControl
							label={ __(
								'Highlight required fields with an asterisk',
								'woo-gutenberg-products-block'
							) }
							checked={ showRequiredAsterisk }
							onChange={ () =>
								setAttributes( { showRequiredAsterisk: ! showRequiredAsterisk } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},
	save() {
		return (
			<Fragment>
				<InnerBlocks.Content />
				[woocommerce_checkout]
			</Fragment>
		);
	},
} );
