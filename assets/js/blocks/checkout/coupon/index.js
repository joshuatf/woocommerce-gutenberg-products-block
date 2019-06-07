/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import interpolateComponents from 'interpolate-components';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'woocommerce/checkout-coupon', {
	title: __( 'Checkout Coupon', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		const { hasCouponsEnabled } = wc_checkout_block_data;

		return hasCouponsEnabled && (
			<div className="woocommerce-info">
				{ interpolateComponents( {
					mixedString: __(
						'Have a coupon? {{link}}Click here to enter your code{{/link}}',
						'woocommerce-admin'
					),
					components: {
						link: <span className="showcoupon" />,
					},
				} ) }
			</div>
		);
	},
	save() {
		return null;
	},
} );
