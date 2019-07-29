using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Pdf.Tron.Utils.RNPdfTronUtils
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNPdfTronUtilsModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNPdfTronUtilsModule"/>.
        /// </summary>
        internal RNPdfTronUtilsModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNPdfTronUtils";
            }
        }
    }
}
