(function(wp) {
    const { addFilter } = wp.hooks;
    const { createHigherOrderComponent } = wp.compose;
    const { Fragment, createElement, cloneElement, Children, isValidElement } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, SelectControl } = wp.components;

    // === CONFIGURATION: Shiki Language List ===
    const SHIKI_LANGUAGES = [
		{ label: "Plain Text", value: "text" },
		{ label: "JavaScript", value: "javascript" },
		{ label: "TypeScript", value: "typescript" },
		{ label: "JSX (React)", value: "jsx" },
		{ label: "TSX (React)", value: "tsx" },
		{ label: "HTML", value: "html" },
		{ label: "CSS", value: "css" },
		{ label: "SCSS", value: "scss" },
		{ label: "JSON", value: "json" },
		{ label: "Markdown", value: "markdown" },
		{ label: "PHP", value: "php" },
		{ label: "Python", value: "python" },
		{ label: "Java", value: "java" },
		{ label: "C", value: "c" },
		{ label: "C++", value: "cpp" },
		{ label: "C#", value: "csharp" },
		{ label: "Go", value: "go" },
		{ label: "Rust", value: "rust" },
		{ label: "Ruby", value: "ruby" },
		{ label: "Bash", value: "bash" },
		{ label: "Shell", value: "shell-session" },
		{ label: "SQL", value: "sql" },
		{ label: "YAML", value: "yaml" },
		{ label: "Dockerfile", value: "dockerfile" },
		{ label: "GraphQL", value: "graphql" },
		{ label: "Kotlin", value: "kotlin" },
		{ label: "Swift", value: "swift" },
		{ label: "Vue", value: "vue" },
		{ label: "Svelte", value: "svelte" },
		{ label: "Astro", value: "astro" },
		{ label: "Liquid", value: "liquid" },
		{ label: "Nginx", value: "nginx" },
		{ label: "PowerShell", value: "powershell" },
	];

    // Add 'language' attribute to the core/code block
    function addLanguageAttribute(settings, name) {
        if (name !== 'core/code') return settings;

        return Object.assign({}, settings, {
            attributes: Object.assign({}, settings.attributes, {
                language: {
                    type: 'string',
                    default: 'text',
                },
            }),
        });
    }

    // Add the Select Dropdown to the Sidebar
    const withLanguageControl = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            if (props.name !== 'core/code') {
                return createElement(BlockEdit, props);
            }

            const { attributes, setAttributes } = props;

            return createElement(
                Fragment,
                {},
                createElement(BlockEdit, props),
                createElement(
                    InspectorControls,
                    {},
                    createElement(
                        PanelBody,
                        { title: 'Code Settings', initialOpen: true },
                        createElement(SelectControl, {
                            label: 'Language',
                            value: attributes.language,
                            options: SHIKI_LANGUAGES,
                            onChange: (value) => setAttributes({ language: value }),
                        })
                    )
                )
            );
        };
    }, 'withLanguageControl');

    // Inject the class into the inner <code> element
   function addLanguageClassToCodeElement(element, blockType, attributes) {
        // Safety checks
        if (!element || blockType.name !== 'core/code') {
            return element;
        }

        const { language } = attributes;

        // If no language is selected, return original element
        if (!language || language === 'text') {
            return element;
        }

        // The 'element' is the <pre> tag.
        // We look at its children to find the inner content component.
        const children = Children.map(element.props.children, (child) => {

            // We assume the valid child inside a generic code block is the content we want.
            // We removed the strictly check (child.type === 'code') because Gutenberg
            // uses a "RichText.Content" component here, not a literal 'code' string.
            if (isValidElement(child)) {

                // Get existing classes if any
                const existingClass = child.props.className || '';

                // Append our language class
                const newClass = (existingClass + ' language-' + attributes.language).trim();

                // Clone the child component and force the className onto it.
                // RichText.Content accepts className and passes it to the underlying <code> tag.
                return cloneElement(child, {
                    className: newClass
                });
            }
            return child;
        });

        // Return the wrapper (<pre>) with the modified children
        return cloneElement(element, {}, children);
    }

    // Register Hooks
    addFilter(
        'blocks.registerBlockType',
        'hcl/add-language-attribute',
        addLanguageAttribute
    );

    addFilter(
        'editor.BlockEdit',
        'hcl/with-language-control',
        withLanguageControl
    );

    addFilter(
        'blocks.getSaveElement',
        'hcl/modify-save-element',
        addLanguageClassToCodeElement
    );

})(window.wp);
