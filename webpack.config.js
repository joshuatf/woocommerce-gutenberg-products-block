/**
 * External dependencies
 */
const path = require( 'path' );
const MergeExtractFilesPlugin = require( './bin/merge-extract-files-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const chalk = require( 'chalk' );
const NODE_ENV = process.env.NODE_ENV || 'development';

const externals = {
	// We can add @woocommerce packages here when wc-admin merges into wc core,
	// for now we need to fetch those from npm.
	'@wordpress/api-fetch': { this: [ 'wp', 'apiFetch' ] },
	'@wordpress/blocks': { this: [ 'wp', 'blocks' ] },
	'@wordpress/components': { this: [ 'wp', 'components' ] },
	'@wordpress/compose': { this: [ 'wp', 'compose' ] },
	'@wordpress/data': { this: [ 'wp', 'data' ] },
	'@wordpress/dom': { this: [ 'wp', 'dom' ] },
	'@wordpress/editor': { this: [ 'wp', 'editor' ] },
	'@wordpress/element': { this: [ 'wp', 'element' ] },
	'@wordpress/hooks': { this: [ 'wp', 'hooks' ] },
	'@wordpress/i18n': { this: [ 'wp', 'i18n' ] },
	'@wordpress/url': { this: [ 'wp', 'url' ] },
	lodash: 'lodash',
	moment: 'moment',
};

function findModuleMatch( module, match ) {
	if ( module.request && match.test( module.request ) ) {
		return true;
	} else if ( module.issuer ) {
		return findModuleMatch( module.issuer, match );
	}
	return false;
}

/**
 * Config for compiling Gutenberg blocks JS.
 */
const GutenbergBlocksConfig = {
	mode: NODE_ENV,
	entry: {
		// Shared blocks code
		blocks: './assets/js/index.js',
		// Blocks
		'handpicked-products': './assets/js/blocks/handpicked-products/index.js',
		'product-best-sellers': './assets/js/blocks/product-best-sellers/index.js',
		'product-category': './assets/js/blocks/product-category/index.js',
		'product-new': './assets/js/blocks/product-new/index.js',
		'product-on-sale': './assets/js/blocks/product-on-sale/index.js',
		'product-top-rated': './assets/js/blocks/product-top-rated/index.js',
		'products-attribute': './assets/js/blocks/products-by-attribute/index.js',
		'featured-product': './assets/js/blocks/featured-product/index.js',
		// Global styles
		styles: [ './assets/css/style.scss', './assets/css/editor.scss' ],
		// Checkout blocks
		checkout: './assets/js/blocks/checkout/index.js',
	},
	output: {
		path: path.resolve( __dirname, './build/' ),
		filename: '[name].js',
		library: [ 'wc', 'blocks', '[name]' ],
		libraryTarget: 'this',
		// This fixes an issue with multiple webpack projects using chunking
		// overwriting each other's chunk loader function.
		// See https://webpack.js.org/configuration/output/#outputjsonpfunction
		jsonpFunction: 'webpackWcBlocksJsonp',
	},
	externals,
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					enforce: true,
				},
				editor: {
					// Capture all `editor` stylesheets and the components stylesheets.
					test: ( module = {} ) =>
						module.constructor.name === 'CssModule' &&
						( findModuleMatch( module, /editor\.scss$/ ) ||
							findModuleMatch( module, /[\\/]components[\\/]/ ) ),
					name: 'editor',
					chunks: 'all',
					enforce: true,
					priority: 10,
				},
				style: {
					test: /style\.scss$/,
					name: 'style',
					chunks: 'all',
					enforce: true,
					priority: 5,
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory',
			},
			{
				test: /\.s[c|a]ss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
					{
						loader: 'sass-loader',
						query: {
							includePaths: [ 'assets/css/abstracts' ],
							data:
								'@import "_colors"; ' +
								'@import "_variables"; ' +
								'@import "_breakpoints"; ' +
								'@import "_mixins"; ',
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
		} ),
		new MergeExtractFilesPlugin( [
			'build/editor.js',
			'build/style.js',
			'build/styles.js',
		], 'build/vendors.js' ),
		new ProgressBarPlugin( {
			format: chalk.blue( 'Build' ) + ' [:bar] ' + chalk.green( ':percent' ) + ' :msg (:elapsed seconds)',
		} ),
	],
	performance: {
		hints: false,
	},
	stats: {
		all: false,
		assets: true,
		builtAt: true,
		colors: true,
		errors: true,
		hash: true,
		timings: true,
	},
};

module.exports = [ GutenbergBlocksConfig ];
