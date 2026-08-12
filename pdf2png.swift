import Foundation
import PDFKit
import AppKit

let args = CommandLine.arguments
guard args.count >= 2 else { print("usage: pdf2png <pdf> [scale]"); exit(1) }
let url = URL(fileURLWithPath: args[1])
let scale: CGFloat = args.count >= 3 ? CGFloat(Double(args[2]) ?? 1.4) : 1.4
guard let doc = PDFDocument(url: url) else { print("open fail"); exit(1) }
let outDir = url.deletingLastPathComponent().appendingPathComponent("pdf_preview")
try? FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)
for i in 0..<doc.pageCount {
    guard let page = doc.page(at: i) else { continue }
    let rect = page.bounds(for: .mediaBox)
    let img = NSImage(size: NSSize(width: rect.width * scale, height: rect.height * scale))
    img.lockFocus()
    NSColor.white.setFill()
    NSRect(x: 0, y: 0, width: rect.width * scale, height: rect.height * scale).fill()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.saveGState()
    ctx.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: ctx)
    ctx.restoreGState()
    img.unlockFocus()
    guard let tiff = img.tiffRepresentation, let rep = NSBitmapImageRep(data: tiff),
          let png = rep.representation(using: .png, properties: [:]) else { continue }
    let out = outDir.appendingPathComponent(String(format: "p%02d.png", i + 1))
    try? png.write(to: out)
}
print("rendered \(doc.pageCount) pages -> \(outDir.path)")
