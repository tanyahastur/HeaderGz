![Preview](preview.png)

# HeaderGz v1.2.0

**HeaderGz** is a recreation of the **HeroGamers GunZ** header made in native JavaScript. This project is a complete update of the original code created by **MiyakeDev**, a user from the **RageZone** forum. The improvements in this version make the code more readable and easier to modify, as well as implementing the menu in the same canvas. Feel free to use it as you see fit.

## Changelog - HeaderGz

### Version 1.2.0
**Release Date**: *10/11/2024*

**New Features and Improvements:**

1. **New Properties in `defaults`**:
   - **`wordSpacing`**: controls spacing between menu items.
   - **`floatToLeft`**: allows aligning the menu to the left when enabled.

2. **Menu Modifications**:
   - Added an `enabled` property for each menu entry, allowing menu items to be enabled or disabled as needed.
   - Added a `target` property to specify if the link opens in the same window (`_self`) or in a new tab (`_blank`).

3. **Dynamic Menu Positioning**:
   - Introduced a dynamic calculation for the initial position (`xAxisPosition`) based on `floatToLeft`. If disabled, the menu starts from position 779 (right alignment).
   - The position of each item is calculated using `wordSpacing`, providing control over spacing between menu items.

4. **Additional Events for Enhanced User Experience**:
   - Added a `mouseup` event on `window` and `defaults.canvas` to reset `clickedMenu` to `null` when clicking outside the menu items.
   - Introduced a `blur` event on `window` to clear `clickedMenu` and `hoveredMenu` variables if the window loses focus.


[HeaderGz Live Preview](https://tanya.hastur.dev/headerGz)
