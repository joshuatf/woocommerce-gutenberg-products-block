/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/editor';

const { privacyPolicy } = wc_checkout_block_data;

class Edit extends Component {
	componentDidMount() {
		this.props.setAttributes( { content: privacyPolicy } );
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { content } = attributes;
		return (
			<RichText
				tagName="p"
				onChange={ ( nextValues ) => setAttributes( { content: nextValues } ) }
				value={ content }
			/>
		);
	}
}

registerBlockType( 'woocommerce/checkout-privacy-policy', {
	title: __( 'Privacy Policy', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
			default: '',
		},
	},
	supports: {
		html: false,
		multiple: false,
	},
	edit: Edit,
	save( { attributes } ) {
		const { content } = attributes;
		return content || privacyPolicy;
	},
} );
