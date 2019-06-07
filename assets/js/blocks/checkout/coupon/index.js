/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import interpolateComponents from 'interpolate-components';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

registerBlockType( 'woocommerce/checkout-coupon', {
	title: __( 'Checkout Coupon', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	parent: [ 'woocommerce/checkout' ],
	supports: {
		html: false,
		inserter: false,
		multiple: false,
	},
	edit() {
		const { hasCouponsEnabled } = wc_checkout_block_data;

		return hasCouponsEnabled && (
			<div className="wc-checkout__coupon">
				{ interpolateComponents( {
					mixedString: __(
						'Have a coupon? {{link}}Click here to enter your code{{/link}}',
						'woocommerce-admin'
					),
					components: {
						link: <span className="wc-checkout__coupon-show-coupon" />,
					},
				} ) }
			</div>
		);
	},
	save() {
		return null;
	},
} );
