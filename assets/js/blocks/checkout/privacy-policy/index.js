/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';

registerBlockType( 'woocommerce/checkout-privacy-policy', {
	title: __( 'Privacy Policy', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		return (
			<InnerBlocks
				template={ [
					[
						'core/paragraph',
						{
							content: wc_checkout_block_data.privacyPolicy,
							level: 3,
						},
					],
				] }
				templateLock="all"
			/>
		);
	},
	save() {
		return <InnerBlocks.Content />;
	},
} );
