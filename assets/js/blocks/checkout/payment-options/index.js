/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'woocommerce/checkout-payment-options', {
	title: __( 'Checkout Payment Options', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		return (
			<div id="payment">
				<ul className="wc_payment_methods payment_methods methods">
					{ Object.values( wc_checkout_block_data.enabledPaymentGateways ).map( ( paymentMethod, i ) => {
						return (
							<li key={ paymentMethod.id } className={ 'wc_payment_method payment_method_' + paymentMethod.id }>
								<input id={ 'wc_payment_method_' + paymentMethod.id } type="radio" checked={ i === 0 } disabled />
								<label htmlFor={ 'wc_payment_method_' + paymentMethod.id }>
									{ paymentMethod.title }
								</label>
								<div className={ 'payment_box payment_method_' + paymentMethod.id }>
									<p>{ paymentMethod.description }</p>
								</div>
							</li>
						);
					} ) }
				</ul>
			</div>
		);
	},
	save() {
		return null;
	},
} );
