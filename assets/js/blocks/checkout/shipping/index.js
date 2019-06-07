/**
* WordPress dependencies
*/
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

registerBlockType( 'woocommerce/checkout-shipping', {
	title: __( 'Checkout Shipping', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		const { hasShippingEnabled } = wc_checkout_block_data;
		return hasShippingEnabled && (
			<ToggleControl
				classNames="wc-checkout__ship-to-different-address"
				disabled
				label={ __( 'Ship to a different address?', 'woocommerce-admin' ) }
				checked={ false }
				onChange={ () => {} }
				required={ false }
			/>
		);
	},
	save() {
		return null;
	},
} );
