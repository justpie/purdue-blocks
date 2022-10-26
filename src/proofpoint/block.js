/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
// import "./editor.scss";
// import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  TextControl,
  TextareaControl,
  Button,
  CheckboxControl,
  RadioControl
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, useBlockProps, RichText } = wp.blockEditor;

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("purdue-blocks/proofpoint", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Reasons to Believe"), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 100"><defs></defs><g id="Bookmark" class="cls-1"><g class="cls-1"><path class="color-9c9795" d="M87.5,9.37V100L50,78.12,12.5,100V9.37A9.38,9.38,0,0,1,21.87,0H78.13A9.38,9.38,0,0,1,87.5,9.37Zm-9.37,1.18A1.18,1.18,0,0,0,77,9.37H23.05a1.18,1.18,0,0,0-1.18,1.18V83.68L50,67.27,78.13,83.68Z" transform="translate(-12.5 0)"/></g></g></svg>
    ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "purdue-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */

  attributes: {
    color: { type: "string", default: "black"  },
    border:{ type: "boolean", default: false },
    buttonColor: { type: "string", default: "black"  },
    hasLead: { type: 'boolean', default: false },
    lead: { type: "string", default: "" },
    highlighted: { type: "string", default: "" },
    headerfontStyle: { type: "string", default: "narrow" },
    contentfontStyle: { type: "string", default: "narrow" },
    content: { type: "string", default: "" },
    source: { type: "string", default: "" },
    ctaUrl: { type: "string", default: "" },
    ctaText: { type: "string", default: "" },
    external: { type: 'boolean', default: false },
    height: { type: "string", default: "auto" },
    boxshadow:  { type: 'boolean', default: true },
  },

  supports: {
    className: true,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    "This block adds a Reasons to Believe card."
  ),

  edit: (props) => {
    const setChecked = () => {
      if (props.attributes.border) {
        props.setAttributes({
          border: false,
        });
      } else {
        props.setAttributes({
          border: true,
        });
      }
    };
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
                label="Background Color"
                help="Choose to background color of the proofpoint."
                selected={ props.attributes.color }
                options={ [
                  { label: 'Black', value: 'black' },
                  { label: 'White', value: 'white' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { color: option } )
                } }
              />
            </PanelRow>
            <PanelRow>
            <RadioControl
                label="Height"
                help="Choose to the height of the proofpoint."
                selected={ props.attributes.height }
                options={ [
                  { label: 'Auto', value: 'auto' },
                  { label: '100%', value: 'full' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { height: option } )
                } }
              />
            </PanelRow>
            <PanelRow>
              <CheckboxControl
                label="Add Lead Text above Highlighted Text?"
                checked={ props.attributes.hasLead }
                onChange={ () =>
                  props.setAttributes( { hasLead: ! props.attributes.hasLead } )
                }
              />
            </PanelRow>
          </PanelBody>
          {props.attributes.color === 'white'?(
        <PanelBody>
          <PanelRow>
            <CheckboxControl
              label="Add box shadow?"
              help="Would you like to add box shadow around the proofpoint?"
              checked={props.attributes.boxshadow}
              onChange={()=>{
                props.setAttributes( { boxshadow: ! props.attributes.boxshadow } )
              }}
            />
          </PanelRow>
        </PanelBody>
        ):''}
          {props.attributes.color === 'white'?(
        <PanelBody>
          <PanelRow>
            <CheckboxControl
              label="Add border?"
              help="Would you like to add border at the top to the proofpoint?"
              checked={props.attributes.border}
              onChange={setChecked}
            />
          </PanelRow>
        </PanelBody>
        ):''}
        {props.attributes.color === 'white'?(
        <PanelBody>
          <PanelRow>
            <RadioControl
                label="Button Color"
                help="Choose the CTA button color."
                selected={ props.attributes.buttonColor }
                options={ [
                  { label: 'Black', value: 'black' },
                  { label: 'White', value: 'white' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { buttonColor: option } )
                } }
              />
            </PanelRow>
        </PanelBody>
        ):''}
        <PanelBody>
          <PanelRow>
            <RadioControl
                label="Highlighted Text Style"
                selected={ props.attributes.headerfontStyle }
                options={ [
                  { label: 'Wide', value: 'wide' },
                  { label: 'Narrow', value: 'narrow' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { headerfontStyle: option } )
                } }
              />
            </PanelRow>
          </PanelBody>
          <PanelBody>
          <PanelRow>
            <RadioControl
                label="Content Text Style"
                selected={ props.attributes.contentfontStyle }
                options={ [
                  { label: 'Wide', value: 'wide' },
                  { label: 'Narrow', value: 'narrow' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { contentfontStyle: option } )
                } }
              />
            </PanelRow>
          </PanelBody>
          <PanelBody>
          <h2>Button Link setting</h2>
            <PanelRow>
              <TextControl
                label="Call to action text"
                value={ props.attributes.ctaText }
                onChange={ ( ctaText ) => props.setAttributes( { ctaText } ) }
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                label="Link address"
                value={ props.attributes.ctaUrl }
                onChange={ ( ctaUrl ) => props.setAttributes( { ctaUrl } ) }
              />
            </PanelRow>
            <PanelRow>
              <CheckboxControl
                label="Open link in new tab?"
                checked={ props.attributes.external }
                onChange={ () =>
                  props.setAttributes( { external: ! props.attributes.external } )
                }
              />
            </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={ `pu-proofpoint pu-proofpoint--editor${
        props.attributes.color === 'black' ? ' pu-proofpoint__black' : ' pu-proofpoint__white'
      }${
        props.attributes.border ? ' pu-proofpoint__border' : ''
      }${
        props.attributes.boxshadow ? '' : ' pu-proofpoint__no-shadow'
      }
      ${
        props.attributes.height==="full"?" pu-proofpoint__height":""
      }
      ${
        props.attributes.hasLead?" pu-proofpoint__has-lead":""
      }`} >
         <div className="container">
         { props.attributes.hasLead?
         <RichText
            tagname={"p"}
            value={props.attributes.lead}
            className={`pu-proofpoint__lead`} 
            onChange={(lead) => {
              props.setAttributes( { lead } );
            }}
            placeholder="Add Lead text"
          ></RichText>:""}
          <RichText
            tagname={"p"}
            value={props.attributes.highlighted}
            className={`pu-proofpoint__highlighted
                        ${props.attributes.headerfontStyle==="wide" ?"  pu-proofpoint__highlighted-wide":"  pu-proofpoint__highlighted-narrow"}
                        `} 
            onChange={(highlighted) => {
              props.setAttributes( { highlighted } );
            }}
            placeholder="Add Highlighted text"
          ></RichText>
          <RichText
            tagname={"p"}
            value={props.attributes.content}
            className={`pu-proofpoint__content
                        ${props.attributes.contentfontStyle==="wide" ?"  pu-proofpoint__content-wide":"  pu-proofpoint__content-narrow"}
                        `} 
            onChange={(content) => {
              props.setAttributes( { content } );
            }}
            placeholder="Add content text"
          ></RichText>
           <RichText
            tagname={"p"}
            value={props.attributes.source}
            className={`pu-proofpoint__source`} 
            onChange={(source) => {
              props.setAttributes( { source } );
            }}
            placeholder="Add Source of the Proofpoint"
          ></RichText>
          {(!props.attributes.ctaUrl||!props.attributes.ctaText)?'':(props.attributes.color === 'white'&&props.attributes.buttonColor==="white")?
              (<a
              href={props.attributes.ctaUrl}
              className="pu-proofpoint__button pu-proofpoint__button-white"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              {props.attributes.ctaText}
            </a>):(<a
              href={props.attributes.ctaUrl}
              className="pu-proofpoint__button"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              {props.attributes.ctaText}
            </a>)}
        </div>
      </div>,
    ];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className={ `pu-proofpoint${
        props.attributes.color === 'black' ? ' pu-proofpoint__black' : ' pu-proofpoint__white'
      }${
        props.attributes.border ? ' pu-proofpoint__border' : ''
      }
      ${
        props.attributes.boxshadow ? '' : ' pu-proofpoint__no-shadow'
      }
      ${
        props.attributes.height==="full"?" pu-proofpoint__height":""
      }
      ${
        props.attributes.hasLead?" pu-proofpoint__has-lead":""
      }
      `}>       
          <div className="container">
          {props.attributes.lead && props.attributes.hasLead ?
            <RichText.Content
            className={`pu-proofpoint__lead`} 
            tagName={ "p" }
            value={props.attributes.lead}
            />:""}
            {!props.attributes.highlighted ?'':
            <RichText.Content
            tagName={"p"}
            value={props.attributes.highlighted}
            className={`pu-proofpoint__highlighted
                        ${props.attributes.headerfontStyle==="wide" ?"  pu-proofpoint__highlighted-wide":"  pu-proofpoint__highlighted-narrow"}
                        `} 
          />}
          {!props.attributes.content ?'':
            <RichText.Content
            className={`pu-proofpoint__content
            ${props.attributes.contentfontStyle==="wide" ?"  pu-proofpoint__content-wide":"  pu-proofpoint__content-narrow"}
            `} 
            tagName={ "p" }
            value={props.attributes.content}
          />}
           {!props.attributes.source ?'':
            <RichText.Content
            className={`pu-proofpoint__source`} 
            tagName={ "p" }
            value={props.attributes.source}
          />}
            {(!props.attributes.ctaUrl||!props.attributes.ctaText)?'':(props.attributes.color === 'white'&&props.attributes.buttonColor==="white")?
                  (<a
                  href={props.attributes.ctaUrl}
                  className="pu-proofpoint__button pu-proofpoint__button-white"
                  target={ props.attributes.external ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  {props.attributes.ctaText}
                </a>):(<a
                  href={props.attributes.ctaUrl}
                  className="pu-proofpoint__button"
                  target={ props.attributes.external ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  {props.attributes.ctaText}
                </a>)}
          </div>
      </div>
    );
    return returned;
  },
  deprecated: [
    {
      attributes: {
        color: { type: "string", default: "black"  },
        border:{ type: "boolean", default: false },
        buttonColor: { type: "string", default: "black"  },
        highlighted: { type: "string", default: "" },
        headerfontStyle: { type: "string", default: "narrow" },
        contentfontStyle: { type: "string", default: "narrow" },
        content: { type: "string", default: "" },
        source: { type: "string", default: "" },
        ctaUrl: { type: "string", default: "" },
        ctaText: { type: "string", default: "" },
        external: { type: 'boolean', default: false },
        height: { type: "string", default: "auto" },
      },
      save: (props) => {
        const blockProps = useBlockProps.save();
        const returned = (
          <div {...blockProps} className={ `pu-proofpoint${
            props.attributes.color === 'black' ? ' pu-proofpoint__black' : ' pu-proofpoint__white'
          }${
            props.attributes.border ? ' pu-proofpoint__border' : ''
          }
          ${
            props.attributes.height==="full"?" pu-proofpoint__height":""
          }`}>       
              <div className="container">
               {!props.attributes.highlighted ?'':props.attributes.headerfontStyle==="wide" ?(
                <p className="pu-proofpoint__highlighted pu-proofpoint__highlighted-wide">
                  {props.attributes.highlighted}
                </p>):(
                <p className="pu-proofpoint__highlighted pu-proofpoint__highlighted-narrow">
                  {props.attributes.highlighted}
                </p>)}
                {!props.attributes.content ?'':props.attributes.contentfontStyle==="wide" ?(
                <p className="pu-proofpoint__content pu-proofpoint__content-wide">
                  {props.attributes.content}
                </p>):(<p className="pu-proofpoint__content pu-proofpoint__content-narrow">
                  {props.attributes.content}
                </p>)}
                {!props.attributes.source ?'':(
                <p className="pu-proofpoint__source">
                  {props.attributes.source}
                </p>)}
                {(!props.attributes.ctaUrl||!props.attributes.ctaText)?'':(props.attributes.color === 'white'&&props.attributes.buttonColor==="white")?
                      (<a
                      href={props.attributes.ctaUrl}
                      className="pu-proofpoint__button pu-proofpoint__button-white"
                      target={ props.attributes.external ? '_blank' : '_self' }
                      rel="noopener noreferrer"
                    >
                      {props.attributes.ctaText}
                    </a>):(<a
                      href={props.attributes.ctaUrl}
                      className="pu-proofpoint__button"
                      target={ props.attributes.external ? '_blank' : '_self' }
                      rel="noopener noreferrer"
                    >
                      {props.attributes.ctaText}
                    </a>)}
              </div>
          </div>
        );
        return returned;
      },
    }],
});