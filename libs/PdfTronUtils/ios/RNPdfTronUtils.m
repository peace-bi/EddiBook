
#import "RNPdfTronUtils.h"
#import <PDFNet/PDFNet.h>

@implementation RNPdfTronUtils

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(exportAnnotations,
                 url:(NSString *)url
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    PTPDFDoc *pdfDoc = [[PTPDFDoc alloc] initWithFilepath:url];
    [pdfDoc InitSecurityHandler];
    
    PTFDFDoc *doc_annots = [pdfDoc FDFExtract:e_ptannots_only];
    
    [doc_annots SetPDFFileName: url];
    
    NSString *fileName = [url stringByDeletingPathExtension];
    NSString *fxdfUrl = [NSString stringWithFormat:@"%@%s", fileName, ".xfdf"];
    
    [doc_annots SaveAsXFDF:fxdfUrl];
    
    resolve(fxdfUrl);
    
}


@end
  
