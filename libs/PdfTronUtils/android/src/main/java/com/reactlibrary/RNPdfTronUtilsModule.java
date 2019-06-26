
package com.reactlibrary;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.pdftron.common.PDFNetException;
import com.pdftron.fdf.FDFDoc;
import com.pdftron.pdf.PDFDoc;

public class RNPdfTronUtilsModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNPdfTronUtilsModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNPdfTronUtils";
  }

  @ReactMethod
  public void exportAnnotations(String fileName, Promise promise) {
    try {
      String mCacheDir = getCurrentActivity().getCacheDir().getAbsolutePath();
      PDFDoc pdfDoc = new PDFDoc(mCacheDir + '/' + fileName + ".pdf");
      pdfDoc.initSecurityHandler();
      FDFDoc docAnnots = pdfDoc.fdfExtract(PDFDoc.e_annots_only);

      docAnnots.setPDFFileName(fileName + ".pdf");

      String xfdfFileUrl = mCacheDir + '/' + fileName + ".xfdf";
      docAnnots.saveAsXFDF(xfdfFileUrl);

      promise.resolve(xfdfFileUrl);

    } catch (PDFNetException e) {
      e.printStackTrace();
      promise.reject(e.getMessage());
    }
  }
}