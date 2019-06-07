/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

registerBlockType( 'woocommerce/checkout-payment-options', {
	title: __( 'Checkout Payment Options', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	supports: {
		html: false,
	},
	edit() {
		if ( 'object' !== typeof wc_checkout_block_data || 'object' !== typeof wc_checkout_block_data.enabledPaymentGateways ) {
			return;
		}

		return (
			<div id="wc-checkout__payment">
				<ul className="wc-checkout__payment-methods">
					{ Object.values( wc_checkout_block_data.enabledPaymentGateways ).map( ( paymentMethod, i ) => {
						return (
							<li key={ paymentMethod.id } className={ 'wc-checkout__payment-method wc-checkout__payment-method-' + paymentMethod.id }>
								<input id={ 'wc-checkout__payment-method-' + paymentMethod.id } type="radio" checked={ i === 0 } disabled />
								<label htmlFor={ 'wc-checkout__payment-method-' + paymentMethod.id }>
									{ paymentMethod.title }
								</label>
								<div className={ 'wc-checkout__payment-box wc-checkout__payment-method-' + paymentMethod.id }>
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
