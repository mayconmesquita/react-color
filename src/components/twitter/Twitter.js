import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import map from 'lodash/map'
import merge from 'lodash/merge'
import colorUtils from '../../helpers/color'

import { ColorWrap, EditableInput, Swatch } from '../common'

import CheckIcon from '@icons/material/CheckIcon'

export const Twitter = ({ onChange, onSwatchHover, hex, colors, width, triangle, color, disableCodeInput, headerComponent, footerComponent, center, checkmarkColor, disablePopover,
  styles: passedStyles = {}, className = '' }) => {
  const styles = reactCSS(merge({
    'default': {
      card: {
        width,
        background: '#fff',
        border: '0 solid rgba(0,0,0,0.25)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        borderRadius: '4px',
        position: 'relative',
        transform: center ? 'translate(55%, 0%)' : null,
      },
      body: {
        padding: disablePopover ? 0 : '15px 9px 9px 15px',
      },
      label: {
        fontSize: '18px',
        color: '#fff',
      },
      triangle: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent #fff transparent',
        position: 'absolute',
      },
      triangleShadow: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent rgba(0,0,0,.1) transparent',
        position: 'absolute',
      },
      hash: {
        background: '#F0F0F0',
        height: '30px',
        width: '30px',
        borderRadius: '4px 0 0 4px',
        float: 'left',
        color: '#98A1A4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      input: {
        width: '100px',
        fontSize: '14px',
        color: '#666',
        border: '0px',
        outline: 'none',
        height: '28px',
        boxShadow: 'inset 0 0 0 1px #F0F0F0',
        boxSizing: 'content-box',
        borderRadius: '0 4px 4px 0',
        float: 'left',
        paddingLeft: '8px',
      },
      swatch: {
        width: '30px',
        height: '30px',
        float: 'left',
        borderRadius: '4px',
        margin: '0 6px 6px 0',
      },
      swatchSelected: {
        boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.60)',
      },
      clear: {
        clear: 'both',
      },
    },
    'hide-triangle': {
      triangle: {
        display: 'none',
      },
      triangleShadow: {
        display: 'none',
      },
    },
    'top-left-triangle': {
      triangle: {
        top: '-10px',
        left: '12px',
      },
      triangleShadow: {
        top: '-11px',
        left: '12px',
      },
    },
    'top-right-triangle': {
      triangle: {
        top: '-10px',
        right: '12px',
      },
      triangleShadow: {
        top: '-11px',
        right: '12px',
      },
    },
    'top-center-triangle': {
      triangle: {
        top: '-10px',
        left: `calc(${width} - 50% - 9px)`,
      },
      triangleShadow: {
        top: '-11px',
        left: `calc(${width} - 50% - 9px)`,
      },
    },
  }, passedStyles), {
    'hide-triangle': triangle === 'hide',
    'top-left-triangle': triangle === 'top-left',
    'top-right-triangle': triangle === 'top-right',
    'top-center-triangle': triangle === 'top-center',
  })

  const handleChange = (hexcode, e) => {
    colorUtils.isValidHex(hexcode) && onChange({
      hex: hexcode,
      source: 'hex',
    }, e)
  }

  return (
    <div style={ !disablePopover ? styles.card : { width } } className={ `twitter-picker ${ className }` }>
      { !disablePopover &&
        <React.Fragment>
          <div style={ styles.triangleShadow } />
          <div style={ styles.triangle } />
        </React.Fragment>
      }

      <div style={ styles.body }>
        {!!headerComponent ? headerComponent : null}
        <div style={ styles.clear } />

        { map(colors, (c, i) => {

          const isSelected = c && (hex === c.toLowerCase())

          const activeStyles = reactCSS(
            {
              default: {
                check: {
                  color: checkmarkColor || colorUtils.getContrastingColor(c),
                  display: 'none',
                  marginLeft: 0,
                  marginTop: 2,
                },
              },
              active: {
                check: {
                  display: 'block',
                },
              },
              'color-#FFFFFF': {
                check: {
                  color: '#000',
                },
              },
              transparent: {
                check: {
                  color: '#000',
                },
              },
            },
            {
              'color-#FFFFFF': c === '#FFFFFF',
              transparent: c === 'transparent',
              active: isSelected,
            }
          )

          return (
            <Swatch
              key={ i }
              color={ c }
              hex={ c }
              className={isSelected ? 'selected' : ''}
              style={{
                ...styles.swatch,
                ...(isSelected ? styles.swatchSelected : {})
              }}
              onClick={ handleChange }
              onHover={ onSwatchHover }
            >
              <div style={ activeStyles.check }>
                <CheckIcon />
              </div>
            </Swatch>
          )
        }) }
        { !!disableCodeInput ? null :
          <div>
            <div style={ styles.hash }>#</div>
            <EditableInput
              label={null}
              style={{ input: styles.input }}
              value={ hex.replace('#', '') }
              onChange={ handleChange }
            />
          </div>
        }
        <div style={ styles.clear } />
        {!!footerComponent ? footerComponent : null}
        <div style={ styles.clear } />
      </div>
    </div>
  )
}

Twitter.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  triangle: PropTypes.oneOf(['hide', 'top-left', 'top-right', 'top-center']),
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object,
  disableCodeInput: PropTypes.bool,
  headerComponent: PropTypes.element,
  footerComponent: PropTypes.element,
  center: PropTypes.bool,
  checkmarkColor: PropTypes.string,
  disablePopover: PropTypes.bool,
}

Twitter.defaultProps = {
  width: 276,
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
    '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
  triangle: 'top-left',
  styles: {},
  disableCodeInput: false,
  headerComponent: null,
  footerComponent: null,
  center: false,
  checkmarkColor: null,
  disablePopover: false,
}

export default ColorWrap(Twitter)
