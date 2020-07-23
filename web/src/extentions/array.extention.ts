(Array.prototype as any).remove = function (element: any) {
    const index = this.indexOf(element);
    if (index > -1) {
        this.splice(index, 1);
    }
}