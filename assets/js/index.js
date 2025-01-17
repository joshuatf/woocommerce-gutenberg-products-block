/**
 * External dependencies
 */
import { getCategories, setCategories } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { IconWoo } from './components/icons';

setCategories( [
	...getCategories().filter( ( { slug } ) => slug !== 'woocommerce' ),
	// Add a WooCommerce block category
	{
		slug: 'woocommerce',
		title: __( 'WooCommerce', 'woo-gutenberg-products-block' ),
		icon: <IconWoo />,
	},
	{
		slug: 'woocommerce-checkout',
		title: __( 'WooCommerce Checkout', 'woo-gutenberg-products-block' ),
	},
] );
