var map = {
    title: "Ayo",
    maker: "Dododo73",
    init: function() {
        a.p([10.78007, 0.18007, 1.29007], [2.89, 0, 0], [9.32, 2, 0.6], "2.0", 0, 0, 0.6, false, false);
        a.p([6.50014, 0.18014, 7.19014], [1.07, 0, 0], [9.32, 2, 0.6], "3.0", 0, 0, 0.6, false, false);
        a.p([0.00021, 0.00021, 0.00021], [0, 0, 0], [2, 2, 2], "1", 0, 0, 0.6, false, false);
        a.p([8.49028, 0.00028000000000000003, 3.8802800000000004], [0, 0, 0], [15.94, 2, 8.68], "1", 0, 0, 0.6, false, false);
        a.e([13.60035, 1.11035, 4.80035]);
    },
    post: function() {},
    section_id: 0,
    section_update: function() {},
    reset: function() {
        this.section_id = 0;
        a.re('P0', [10.78007, 0.18007, 1.29007], [2.89, 0, 0], [9.32, 2, 0.6]);
        a.re('P1', [6.50014, 0.18014, 7.19014], [1.07, 0, 0], [9.32, 2, 0.6]);
        a.re('P2', [0.00021, 0.00021, 0.00021], [0, 0, 0], [2, 2, 2]);
        a.re('P3', [8.49028, 0.00028000000000000003, 3.8802800000000004], [0, 0, 0], [15.94, 2, 8.68]);
        a.re('E0', [13.60035, 1.11035, 4.80035], [0, 0, 0], [1, 1, 1]);
    },
    physics_update: function() {},
    render_update: function() {}
}