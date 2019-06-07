/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment, RawHTML } from '@wordpress/element';
import { InspectorControls, RichText } from '@wordpress/editor';
import { PanelBody } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import PageControl from '../../../components/page-control';

const { privacyPolicy, privacyPolicyId } = wc_checkout_block_data; // eslint-disable-line camelcase

class Edit extends Component {
	componentDidMount() {
		this.props.setAttributes( { content: privacyPolicy } );
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { content, privacyPolicyId: pageId } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Select Page', 'woo-gutenberg-products-block' ) }
						initialOpen
					>
						<PageControl
							selected={ pageId || 0 }
							onChange={ ( value = [] ) => {
								const id = value[ 0 ] ? value[ 0 ].id : 0;
								setAttributes( { privacyPolicyId: id } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<RichText
					tagName="p"
					onChange={ ( nextValues ) => setAttributes( { content: nextValues } ) }
					value={ content }
				/>
			</Fragment>
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
			default: privacyPolicy,
		},
		privacyPolicyId: {
			type: 'number',
			default: privacyPolicyId,
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
		return <RawHTML>{ content }</RawHTML>;
	},
} );
