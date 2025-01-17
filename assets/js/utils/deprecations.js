/**
 * External dependencies
 */
import classnames from 'classnames';
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import getShortcode from './get-shortcode';

/**
 * Return a save function using the blockType to generate the correct shortcode.
 */
export const deprecatedConvertToShortcode = ( blockType ) => {
	return function( props ) {
		const {
			align,
			contentVisibility,
		} = props.attributes; /* eslint-disable-line react/prop-types */
		const classes = classnames( align ? `align${ align }` : '', {
			'is-hidden-title': ! contentVisibility.title,
			'is-hidden-price': ! contentVisibility.price,
			'is-hidden-rating': ! contentVisibility.rating,
			'is-hidden-button': ! contentVisibility.button,
		} );
		return (
			<RawHTML className={ classes }>
				{ getShortcode( props, blockType ) }
			</RawHTML>
		);
	};
};
