/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { debounce, find } from 'lodash';
import PropTypes from 'prop-types';
import { SearchListControl } from '@woocommerce/components';

/**
 * Internal dependencies
 */
import { getPages } from '../utils';

class PageControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			list: [],
			loading: true,
		};

		this.debouncedOnSearch = debounce( this.onSearch.bind( this ), 400 );
	}

	componentDidMount() {
		getPages( {} )
			.then( ( list ) => {
				this.setState( { list, loading: false } );
			} )
			.catch( () => {
				this.setState( { list: [], loading: false } );
			} );
	}

	onSearch( search ) {
		getPages( { search } )
			.then( ( list ) => {
				this.setState( { list, loading: false } );
			} )
			.catch( () => {
				this.setState( { list: [], loading: false } );
			} );
	}

	render() {
		const { list, loading } = this.state;
		const { onChange, selected } = this.props;
		const messages = {
			list: __( 'Pages', 'woo-gutenberg-products-block' ),
			noItems: __(
				"Your store doesn't have any pages.",
				'woo-gutenberg-products-block'
			),
			search: __(
				'Search for your privacy policy page.',
				'woo-gutenberg-products-block'
			),
			updated: __(
				'Page search results updated.',
				'woo-gutenberg-products-block'
			),
		};

		// Note: selected prop still needs to be array for SearchListControl.
		return (
			<Fragment>
				<SearchListControl
					className="woocommerce-pages"
					list={ list }
					isLoading={ loading }
					isSingle
					selected={ [ find( list, { id: selected } ) ] }
					onChange={ onChange }
					messages={ messages }
				/>
			</Fragment>
		);
	}
}

PageControl.propTypes = {
	/**
	 * Callback to update the selected page.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * The ID of the currently selected page.
	 */
	selected: PropTypes.number.isRequired,
};

export default PageControl;
