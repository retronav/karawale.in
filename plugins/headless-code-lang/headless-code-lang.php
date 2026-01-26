<?php
/**
 * Plugin Name: Headless Code Block Language
 * Description: Adds a Language dropdown to the core Code block and saves it as a class for Shiki.
 * Version: 1.2
 * Author: Pranav Karawale
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function hcl_enqueue_editor_assets() {
    wp_enqueue_script(
        'hcl-editor-js',
        plugin_dir_url( __FILE__ ) . 'editor.js',
        [ 'wp-blocks', 'wp-dom-ready', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-hooks', 'wp-editor' ],
        '1.2',
        true
    );
}
add_action( 'enqueue_block_editor_assets', 'hcl_enqueue_editor_assets' );
