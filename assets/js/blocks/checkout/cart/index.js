/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RadioControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

registerBlockType( 'woocommerce/checkout-cart', {
	title: __( 'Cart', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		const { hasShippingEnabled, activeShippingMethods } = wc_checkout_block_data;

		const methods = [];
		Object.keys( activeShippingMethods ).forEach( method => {
			methods.push( { label: activeShippingMethods[ method ].title, value: method } );
		} );

		return (
			<div className="wc-checkout__cart">
				<h3>{ __( 'Your Order', 'woo-gutenberg-products-block' ) }</h3>
				<table className="wc-checkout__cart-table">
					<thead>
						<tr>
							<th>{ __( 'Product', 'woo-gutenberg-products-block' ) }</th>
							<th>{ __( 'Total', 'woo-gutenberg-products-block' ) }</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{ __( 'T-Shirt with Logo × 1', 'woo-gutenberg-products-block' ) }</td>
							<td>$4.00</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th>{ __( 'Subtotal', 'woo-gutenberg-products-block' ) }</th>
							<td>$4.00</td>
						</tr>

						{ hasShippingEnabled && methods.length > 0 && (
						<tr>
							<th>{ __( 'Shipping', 'woo-gutenberg-products-block' ) }</th>
							<td>
								<RadioControl
									options={ methods }
									selected={ methods[0].value }
									onChange={ () => null }
								/>
							</td>
						</tr>
						) }

						<tr>
							<th>{ __( 'Total', 'woo-gutenberg-products-block' ) }</th>
							<td>$5.00</td>
						</tr>
					</tfoot>
				</table>
			</div>
		);
	},
	save() {
		return null;
	},
} );
