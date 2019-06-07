/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/editor';

const { termsAndConditions } = wc_checkout_block_data;

class Edit extends Component {
	componentDidMount() {
		this.props.setAttributes( { content: termsAndConditions } );
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { content } = attributes;
		return (
			<Fragment>
				<CheckboxControl
					disabled
					checked={ false }
					onChange={ () => {} }
					required={ true }
				/>
				<RichText
					tagName="p"
					onChange={ ( nextValues ) => setAttributes( { content: nextValues } ) }
					value={ content }
				/>
			</Fragment>
		);
	}
}

registerBlockType( 'woocommerce/terms-and-conditions', {
	title: __( 'Terms and Conditions', 'woo-gutenberg-products-block' ),
	category: 'woocommerce-checkout',
	keywords: [ __( 'WooCommerce', 'woo-gutenberg-products-block' ) ],
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			default: termsAndConditions,
		},
	},
	supports: {
		className: false,
		html: false,
		multiple: false,
	},
	edit: Edit,
	save( { attributes } ) {
		const { content } = attributes;
		return (
			<RawHTML>
				{ content }
			</RawHTML>
		);
	},
} );
